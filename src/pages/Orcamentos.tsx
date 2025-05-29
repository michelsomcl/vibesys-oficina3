
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { 
  FileText, 
  Plus, 
  Search, 
  Edit, 
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from "lucide-react"

const Orcamentos = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Dados mock para demonstração
  const orcamentos = [
    {
      id: "ORC-001",
      cliente: "João Silva",
      veiculo: "Honda Civic 2020",
      dataOrcamento: "10/12/2024",
      validade: "17/12/2024",
      valor: 1250.00,
      status: "Pendente",
      pecas: [
        { nome: "Pastilha de Freio", quantidade: 1, valor: 150.00 },
        { nome: "Óleo Motor", quantidade: 2, valor: 80.00 }
      ],
      servicos: [
        { nome: "Troca de Freio", horas: 2, valorHora: 50.00 },
        { nome: "Troca de Óleo", horas: 1, valorHora: 40.00 }
      ]
    },
    {
      id: "ORC-002",
      cliente: "Maria Santos",
      veiculo: "Toyota Corolla 2019",
      dataOrcamento: "08/12/2024",
      validade: "15/12/2024",
      valor: 850.00,
      status: "Aprovado",
      pecas: [{ nome: "Filtro de Ar", quantidade: 1, valor: 45.00 }],
      servicos: [{ nome: "Revisão Geral", horas: 3, valorHora: 60.00 }]
    },
    {
      id: "ORC-003",
      cliente: "Carlos Lima",
      veiculo: "Ford Focus 2018",
      dataOrcamento: "05/12/2024",
      validade: "12/12/2024",
      valor: 650.00,
      status: "Reprovado",
      pecas: [{ nome: "Amortecedor", quantidade: 2, valor: 200.00 }],
      servicos: [{ nome: "Troca Amortecedor", horas: 2, valorHora: 55.00 }]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "bg-green-100 text-green-800"
      case "Pendente":
        return "bg-yellow-100 text-yellow-800"
      case "Reprovado":
        return "bg-red-100 text-red-800"
      case "Cancelado":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Aprovado":
        return <CheckCircle className="w-4 h-4" />
      case "Pendente":
        return <Clock className="w-4 h-4" />
      case "Reprovado":
        return <XCircle className="w-4 h-4" />
      case "Cancelado":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const filteredOrcamentos = orcamentos.filter(orcamento => {
    const matchesSearch = orcamento.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         orcamento.cliente.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || orcamento.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orçamentos</h1>
          <p className="text-muted-foreground">Gerencie orçamentos e aprovações</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Novo Orçamento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Orçamento</DialogTitle>
            </DialogHeader>
            <OrcamentoForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por número ou cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Aprovado">Aprovado</SelectItem>
                <SelectItem value="Reprovado">Reprovado</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Orçamentos */}
      <div className="grid gap-6">
        {filteredOrcamentos.map((orcamento) => (
          <Card key={orcamento.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{orcamento.id}</CardTitle>
                    <Badge className={getStatusColor(orcamento.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(orcamento.status)}
                        {orcamento.status}
                      </div>
                    </Badge>
                  </div>
                  <div className="text-muted-foreground">
                    <p><strong>Cliente:</strong> {orcamento.cliente}</p>
                    <p><strong>Veículo:</strong> {orcamento.veiculo}</p>
                    <p><strong>Data:</strong> {orcamento.dataOrcamento} | <strong>Validade:</strong> {orcamento.validade}</p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="text-2xl font-bold text-primary">
                    R$ {orcamento.valor.toFixed(2).replace('.', ',')}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    {orcamento.status === "Aprovado" && (
                      <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                        Gerar OS
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Peças */}
                <div>
                  <h4 className="font-medium mb-2">Peças</h4>
                  <div className="space-y-1">
                    {orcamento.pecas.map((peca, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{peca.quantidade}x {peca.nome}</span>
                        <span>R$ {(peca.quantidade * peca.valor).toFixed(2).replace('.', ',')}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Serviços */}
                <div>
                  <h4 className="font-medium mb-2">Serviços</h4>
                  <div className="space-y-1">
                    {orcamento.servicos.map((servico, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{servico.horas}h {servico.nome}</span>
                        <span>R$ {(servico.horas * servico.valorHora).toFixed(2).replace('.', ',')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const OrcamentoForm = () => {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cliente">Cliente</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">João Silva</SelectItem>
              <SelectItem value="2">Maria Santos</SelectItem>
              <SelectItem value="3">Carlos Lima</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="veiculo">Veículo</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o veículo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Honda Civic 2020 - ABC-1234</SelectItem>
              <SelectItem value="2">Toyota Corolla 2019 - XYZ-5678</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dataOrcamento">Data do Orçamento</Label>
          <Input id="dataOrcamento" type="date" />
        </div>
        <div>
          <Label htmlFor="validade">Validade</Label>
          <Input id="validade" type="date" />
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Peças</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Peça" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Pastilha de Freio</SelectItem>
                <SelectItem value="2">Óleo Motor</SelectItem>
                <SelectItem value="3">Filtro de Ar</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Qtd" />
            <Input placeholder="Valor unit." />
            <Button variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Serviços</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Serviço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Troca de Freio</SelectItem>
                <SelectItem value="2">Troca de Óleo</SelectItem>
                <SelectItem value="3">Revisão Geral</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Horas" />
            <Input placeholder="Valor/hora" />
            <Button variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancelar</Button>
        <Button className="bg-primary hover:bg-primary/90">Salvar Orçamento</Button>
      </div>
    </form>
  )
}

export default Orcamentos
