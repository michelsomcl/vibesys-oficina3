import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCreateCliente } from "@/hooks/useClientes"
import { TablesInsert } from "@/integrations/supabase/types"

interface ClientFormProps {
  onSuccess?: () => void
}

export const ClientForm = ({ onSuccess }: ClientFormProps) => {
  const [clienteData, setClienteData] = useState<TablesInsert<"clientes">>({
    tipo: "PF",
    nome: "",
    documento: "",
    telefone: "",
    endereco: "",
    aniversario: "",
  })

  const [veiculoData, setVeiculoData] = useState({
    marca: "",
    modelo: "",
    ano: "",
    placa: "",
    km: "",
  })

  const createCliente = useCreateCliente()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!clienteData.nome || !clienteData.documento) {
      return
    }

    const veiculo = veiculoData.marca ? {
      marca: veiculoData.marca,
      modelo: veiculoData.modelo,
      ano: veiculoData.ano,
      placa: veiculoData.placa,
      km: veiculoData.km || null,
      cliente_id: "" // This will be set by the mutation after cliente is created
    } : undefined

    createCliente.mutate({ cliente: clienteData, veiculo }, {
      onSuccess: () => {
        setClienteData({
          tipo: "PF",
          nome: "",
          documento: "",
          telefone: "",
          endereco: "",
          aniversario: "",
        })
        setVeiculoData({
          marca: "",
          modelo: "",
          ano: "",
          placa: "",
          km: "",
        })
        onSuccess?.()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="dados" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dados">Dados Pessoais</TabsTrigger>
          <TabsTrigger value="veiculo">Veículo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dados" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tipo">Tipo</Label>
              <Select 
                value={clienteData.tipo} 
                onValueChange={(value: "PF" | "PJ") => setClienteData(prev => ({ ...prev, tipo: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PF">Pessoa Física</SelectItem>
                  <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input 
                id="nome" 
                placeholder="Nome completo" 
                value={clienteData.nome}
                onChange={(e) => setClienteData(prev => ({ ...prev, nome: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="documento">CPF/CNPJ</Label>
              <Input 
                id="documento" 
                placeholder="000.000.000-00" 
                value={clienteData.documento}
                onChange={(e) => setClienteData(prev => ({ ...prev, documento: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input 
                id="telefone" 
                placeholder="(11) 99999-9999" 
                value={clienteData.telefone}
                onChange={(e) => setClienteData(prev => ({ ...prev, telefone: e.target.value }))}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="endereco">Endereço</Label>
            <Input 
              id="endereco" 
              placeholder="Endereço completo" 
              value={clienteData.endereco}
              onChange={(e) => setClienteData(prev => ({ ...prev, endereco: e.target.value }))}
            />
          </div>
          
          <div>
            <Label htmlFor="aniversario">Data de Aniversário</Label>
            <Input 
              id="aniversario" 
              placeholder="DD/MM" 
              value={clienteData.aniversario}
              onChange={(e) => setClienteData(prev => ({ ...prev, aniversario: e.target.value }))}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="veiculo" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="marca">Marca</Label>
              <Input 
                id="marca" 
                placeholder="Ex: Honda" 
                value={veiculoData.marca}
                onChange={(e) => setVeiculoData(prev => ({ ...prev, marca: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="modelo">Modelo</Label>
              <Input 
                id="modelo" 
                placeholder="Ex: Civic" 
                value={veiculoData.modelo}
                onChange={(e) => setVeiculoData(prev => ({ ...prev, modelo: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="ano">Ano</Label>
              <Input 
                id="ano" 
                placeholder="2020" 
                value={veiculoData.ano}
                onChange={(e) => setVeiculoData(prev => ({ ...prev, ano: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="placa">Placa</Label>
              <Input 
                id="placa" 
                placeholder="ABC-1234" 
                value={veiculoData.placa}
                onChange={(e) => setVeiculoData(prev => ({ ...prev, placa: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="km">Quilometragem</Label>
              <Input 
                id="km" 
                placeholder="50000" 
                value={veiculoData.km}
                onChange={(e) => setVeiculoData(prev => ({ ...prev, km: e.target.value }))}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline">Cancelar</Button>
        <Button 
          type="submit" 
          className="bg-primary hover:bg-primary/90"
          disabled={createCliente.isPending}
        >
          {createCliente.isPending ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  )
}
