
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types"
import { toast } from "sonner"

type Cliente = Tables<"clientes">
type ClienteInsert = TablesInsert<"clientes">
type ClienteUpdate = TablesUpdate<"clientes">
type Veiculo = Tables<"veiculos">
type VeiculoInsert = TablesInsert<"veiculos">

export interface ClienteWithVeiculos extends Cliente {
  veiculos: Veiculo[]
}

export const useClientes = () => {
  return useQuery({
    queryKey: ["clientes"],
    queryFn: async (): Promise<ClienteWithVeiculos[]> => {
      const { data: clientes, error: clientesError } = await supabase
        .from("clientes")
        .select("*")
        .order("nome")

      if (clientesError) throw clientesError

      const { data: veiculos, error: veiculosError } = await supabase
        .from("veiculos")
        .select("*")

      if (veiculosError) throw veiculosError

      return clientes.map(cliente => ({
        ...cliente,
        veiculos: veiculos.filter(veiculo => veiculo.cliente_id === cliente.id)
      }))
    },
  })
}

export const useCreateCliente = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ cliente, veiculo }: { cliente: ClienteInsert, veiculo?: VeiculoInsert }) => {
      const { data: newCliente, error: clienteError } = await supabase
        .from("clientes")
        .insert(cliente)
        .select()
        .single()

      if (clienteError) throw clienteError

      if (veiculo) {
        const { error: veiculoError } = await supabase
          .from("veiculos")
          .insert({ ...veiculo, cliente_id: newCliente.id })

        if (veiculoError) throw veiculoError
      }

      return newCliente
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] })
      toast.success("Cliente cadastrado com sucesso!")
    },
    onError: (error) => {
      console.error("Erro ao cadastrar cliente:", error)
      toast.error("Erro ao cadastrar cliente")
    },
  })
}

export const useUpdateCliente = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...updates }: ClienteUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from("clientes")
        .update(updates)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] })
      toast.success("Cliente atualizado com sucesso!")
    },
    onError: (error) => {
      console.error("Erro ao atualizar cliente:", error)
      toast.error("Erro ao atualizar cliente")
    },
  })
}

export const useDeleteCliente = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("clientes")
        .delete()
        .eq("id", id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] })
      toast.success("Cliente excluído com sucesso!")
    },
    onError: (error) => {
      console.error("Erro ao excluir cliente:", error)
      toast.error("Erro ao excluir cliente")
    },
  })
}
