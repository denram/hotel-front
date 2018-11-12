import React, { Component } from 'react';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';
import Server from './Server';
import axios from 'axios';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { Button } from 'primereact/components/button/Button';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { Panel } from 'primereact/components/panel/Panel';
import { Growl } from 'primereact/components/growl/Growl';
import { TabView, TabPanel } from 'primereact/components/tabview/TabView';
import Logo from './senior.svg';

class Hospede extends Component {

    constructor() {
        super();
        this.state = {
            status: 0,
            mensagem: '',
            nomeHospede: '',
            documentoHospede: '',
            telefoneHospede: '',
            hospede: '',
            listHospede: [],
            checkin: '',
            listaCheckin: [],
            dataEntrada: '',
            adicionalVeiculo: false,
            dataSaida: '',
            listarHospedados: false,
        }
    }

    gravarHospede = () => {

        this.setState({ status: 0, mensagem: '', });

        if (this.state.nomeHospede.length === 0) {
            this.growl.show({ severity: 'warn', summary: 'Atenção:', detail: 'Informe o nome.' });
            return;
        }
        if (this.state.documentoHospede.length === 0) {
            this.growl.show({ severity: 'warn', summary: 'Atenção:', detail: 'Informe o documento.' });
            return;
        }
        if (this.state.telefoneHospede.length === 0) {
            this.growl.show({ severity: 'warn', summary: 'Atenção:', detail: 'Informe o telefone.' });
            return;
        }

        axios({
            method: 'post',
            url: Server + '/hospede/gravar',
            data: { nome: this.state.nomeHospede, documento: this.state.documentoHospede, telefone: this.state.telefoneHospede }
        })
            .then(
                (result) => {
                    this.setState(result.data);
                    if (this.state.status === 1) {
                        this.growl.show({ severity: 'info', summary: 'Atenção:', detail: 'Hospede Gravado.' });
                    } else if (this.state.status === 0) {
                        this.growl.show({ severity: 'error', summary: 'Erro:', detail: this.state.mensagem });
                    }
                });
    }

    excluirHospede = () => {

        this.setState({ status: 0, mensagem: '', });

        let hospede;
        if (this.state.nomeHospede.length > 0) {
            hospede = { nome: this.state.nomeHospede }
        } else if (this.state.documentoHospede.length > 0) {
            hospede = { documento: this.state.documentoHospede }
        } else if (this.state.telefoneHospede.length > 0) {
            hospede = { telefone: this.state.telefoneHospede }
        } else {
            this.growl.show({ severity: 'warn', summary: 'Atenção:', detail: 'Informe o nome, o documento ou o telefone.' });
            return;
        }

        axios({
            method: 'post',
            url: Server + '/hospede/excluir',
            data: hospede
        })
            .then(
                (result) => {
                    this.setState(result.data);
                    if (this.state.status === 1) {
                        this.growl.show({ severity: 'info', summary: 'Atenção:', detail: 'Hóspede Excluído.' });
                    } else if (this.state.status === 0) {
                        this.growl.show({ severity: 'error', summary: 'Erro:', detail: this.state.mensagem });
                    }
                });
    }

    consultarHistoricoHospede = () => {

        this.setState({ status: 0, mensagem: '', });

        let hospede;
        if (this.state.nomeHospede.length > 0) {
            hospede = { nome: this.state.nomeHospede }
        } else if (this.state.documentoHospede.length > 0) {
            hospede = { documento: this.state.documentoHospede }
        } else if (this.state.telefoneHospede.length > 0) {
            hospede = { telefone: this.state.telefoneHospede }
        } else {
            this.growl.show({ severity: 'warn', summary: 'Atenção:', detail: 'Informe o nome, o documento ou o telefone.' });
            return;
        }

        axios({
            method: 'post',
            url: Server + '/checkin/consultarHistoricoHospede',
            data: hospede
        })
            .then(
                (result) => {
                    this.setState(result.data);
                    if (this.state.status === 1) {
                        let listaCheckin = this.state.listaCheckin;
                        for (var i = 0; i < listaCheckin.length; i++) {
                            if (listaCheckin[i].adicionalVeiculo === true) {
                                listaCheckin[i].adicionalVeiculoDesc = 'Sim';
                            } else if (listaCheckin[i].adicionalVeiculo === false) {
                                listaCheckin[i].adicionalVeiculoDesc = 'Não';
                            }
                        }
                        this.setState({ listaCheckin: listaCheckin });
                        this.growl.show({ severity: 'info', summary: 'Atenção:', detail: 'Consulta Concluída.' });
                    } else if (this.state.status === 0) {
                        this.growl.show({ severity: 'error', summary: 'Erro:', detail: this.state.mensagem });
                    }
                });
    }

    consultarHospede = () => {

        this.setState({ status: 0, mensagem: '', });

        let hospede;
        if (this.state.nomeHospede.length > 0) {
            hospede = { nome: this.state.nomeHospede }
        } else if (this.state.documentoHospede.length > 0) {
            hospede = { documento: this.state.documentoHospede }
        } else if (this.state.telefoneHospede.length > 0) {
            hospede = { telefone: this.state.telefoneHospede }
        } else {
            this.growl.show({ severity: 'warn', summary: 'Atenção:', detail: 'Informe o nome, o documento ou o telefone.' });
            return;
        }

        axios({
            method: 'post',
            url: Server + '/hospede/consultar',
            data: hospede
        })
            .then(
                (result) => {
                    this.setState(result.data);
                    if (this.state.status === 1) {
                        this.consultarHistoricoHospede();
                        this.growl.show({ severity: 'info', summary: 'Atenção:', detail: 'Consulta Concluída.' });
                    } else if (this.state.status === 0) {
                        this.growl.show({ severity: 'error', summary: 'Erro:', detail: this.state.mensagem });
                    }
                });
    }


    checkinEntrar = () => {

        this.setState({ status: 0, mensagem: '', });

        let hospede;
        if (this.state.nomeHospede.length > 0) {
            hospede = { nome: this.state.nomeHospede }
        } else if (this.state.documentoHospede.length > 0) {
            hospede = { documento: this.state.documentoHospede }
        } else if (this.state.telefoneHospede.length > 0) {
            hospede = { telefone: this.state.telefoneHospede }
        } else {
            this.growl.show({ severity: 'warn', summary: 'Atenção:', detail: 'Informe o nome, o documento ou o telefone.' });
            return;
        }

        if (this.state.dataEntrada.length === 0) {
            this.growl.show({ severity: 'warn', summary: 'Atenção:', detail: 'Informe a data de entrada.' });
            return;
        }
        let checkin = { dataEntrada: this.state.dataEntrada, adicionalVeiculo: this.state.adicionalVeiculo }

        axios({
            method: 'post',
            url: Server + '/checkin/entrar',
            data: [hospede, checkin]
        })
            .then(
                (result) => {
                    this.setState(result.data);
                    if (this.state.status === 1) {
                        this.consultarHistoricoHospede();
                        this.growl.show({ severity: 'info', summary: 'Atenção:', detail: 'Checkin Concluído.' });
                    } else if (this.state.status === 0) {
                        this.growl.show({ severity: 'error', summary: 'Erro:', detail: this.state.mensagem });
                    }
                });
    }

    adicionarRemoverVeiculo = () => {
        let adicionalVeiculo = this.state.adicionalVeiculo;
        if (adicionalVeiculo === false) {
            adicionalVeiculo = true;
        } else {
            adicionalVeiculo = false;
        }
        this.setState({ adicionalVeiculo: adicionalVeiculo });
    }

    checkinSair = () => {

        this.setState({ status: 0, mensagem: '', });

        let hospede;
        if (this.state.nomeHospede.length > 0) {
            hospede = { nome: this.state.nomeHospede }
        } else if (this.state.documentoHospede.length > 0) {
            hospede = { documento: this.state.documentoHospede }
        } else if (this.state.telefoneHospede.length > 0) {
            hospede = { telefone: this.state.telefoneHospede }
        } else {
            this.growl.show({ severity: 'warn', summary: 'Atenção:', detail: 'Informe o nome, o documento ou o telefone.' });
            return;
        }

        if (this.state.dataSaida.length === 0) {
            this.growl.show({ severity: 'warn', summary: 'Atenção:', detail: 'Informe a data de saida.' });
            return;
        }
        let checkin = { dataSaida: this.state.dataSaida }

        axios({
            method: 'post',
            url: Server + '/checkin/sair',
            data: [hospede, checkin]
        })
            .then(
                (result) => {
                    this.setState(result.data);
                    if (this.state.status === 1) {
                        this.consultarHistoricoHospede();
                        this.growl.show({ severity: 'info', summary: 'Atenção:', detail: 'Checkout Concluído.' });
                    } else if (this.state.status === 0) {
                        this.growl.show({ severity: 'error', summary: 'Erro:', detail: this.state.mensagem });
                    }
                });
    }

    listarHospedes = () => {

        this.setState({ status: 0, mensagem: '', });

        axios({
            method: 'post',
            url: Server + '/hospede/listarHospedes',
            data: { listarHospedados: this.state.listarHospedados }
        })
            .then(
                (result) => {
                    this.setState(result.data);
                    if (this.state.status === 1) {
                        this.growl.show({ severity: 'info', summary: 'Atenção:', detail: 'Consulta Concluída.' });
                    } else if (this.state.status === 0) {
                        this.growl.show({ severity: 'error', summary: 'Erro:', detail: this.state.mensagem });
                    }
                });
    }

    alterarListarHospedados = () => {
        let listarHospedados = this.state.listarHospedados;
        if (listarHospedados === false) {
            listarHospedados = true;
        } else {
            listarHospedados = false;
        }
        this.setState({ listarHospedados: listarHospedados });
    }

    render() {

        let headerHistoricoHospede = <div className="ui-helper-clearfix" style={{ width: '100%' }}>
            <spam>Histórico do Hóspede</spam>
        </div>;

        let headerListaHospedes = <div className="ui-helper-clearfix" style={{ width: '100%' }}>
            <spam>Lista de Hóspedes</spam>
        </div>;

        return (
            <div style={{ fontSize: 14 }}>
                <Growl ref={(el) => { this.growl = el; }}></Growl>

                <div style={{ height: '7vh', backgroundColor: '#008060' }}>
                    <img src={Logo} alt="Senior Sistemas" style={{ height: '100%' }} />
                </div>


                <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({ activeIndex: e.index })}>
                    <TabPanel header="Hóspede">
                        <Panel header="Hóspede">
                            <div class="ui-g">
                                <div class="ui-g-12 ui-md-4">
                                    <p>Nome:</p>
                                    <InputText id="nome" onChange={(e) => { this.setState({ nomeHospede: e.target.value }) }} value={this.state.nomeHospede} maxLength="50" />
                                </div>
                                <div class="ui-g-12 ui-md-4">
                                    <p>Documento:</p>
                                    <InputText id="documento" onChange={(e) => { this.setState({ documentoHospede: e.target.value }) }} value={this.state.documentoHospede} maxLength="25" />
                                </div>
                                <div class="ui-g-12 ui-md-4">
                                    <p>Telefone:</p>
                                    <InputText id="telefone" onChange={(e) => { this.setState({ telefoneHospede: e.target.value }) }} value={this.state.telefoneHospede} maxLength="25" />
                                </div>
                            </div>
                        </Panel>
                        <br />
                        <Panel header="Opções">
                            <div class="ui-g">
                                <div class="ui-g-12 ui-md-4">
                                    <Button label="Consultar" onClick={this.consultarHospede} />
                                </div>
                                <div class="ui-g-12 ui-md-4">
                                    <Button label="Salvar" onClick={this.gravarHospede} />
                                </div>
                                <div class="ui-g-12 ui-md-4">
                                    <Button label="Excluir" onClick={this.excluirHospede} />
                                </div>
                            </div>
                        </Panel>
                        <br />
                        <Panel header="Informações do Hóspede">
                            <spam>Nome: {this.state.hospede.nome}</spam><br />
                            <spam>Documento: {this.state.hospede.documento}</spam><br />
                            <spam>Telefone: {this.state.hospede.telefone}</spam><br />
                            <spam>Valor Total Gasto: {this.state.hospede.valorTotal}</spam><br />
                            <spam>Valor Última Hospedagem: {this.state.hospede.valorUltimaHospedagem}</spam><br />
                        </Panel>
                    </TabPanel>
                    <TabPanel header="Histórico">
                        <Panel>
                            <Button label="Consultar" onClick={this.consultarHistoricoHospede} />
                        </Panel>
                        <br />
                        <DataTable value={this.state.listaCheckin} header={headerHistoricoHospede} responsive={true}>
                            <Column field="dataEntrada" header="Entrada" sortable={true} style={{ width: '25%' }} />
                            <Column field="dataSaida" header="Saida" sortable={true} style={{ width: '25%' }} />
                            <Column field="adicionalVeiculoDesc" header="Veiculo" sortable={true} style={{ width: '20%' }} />
                            <Column field="valorTotal" header="Vl.Total" sortable={true} style={{ width: '30%' }} />
                        </DataTable>
                    </TabPanel>
                    <TabPanel header="Checkin">
                        <Panel header="Checkin">
                            <div class="ui-g">
                                <div class="ui-g-12 ui-md-4">
                                    <p>Data Entrada:</p>
                                    <InputText id="dataEntrada" onChange={(e) => { this.setState({ dataEntrada: e.target.value }) }} value={this.state.dataEntrada} maxLength="25" />
                                </div>
                                <div class="ui-g-12 ui-md-4">
                                    <br /><br />
                                    <Checkbox inputId="adicionalVeiculo" onChange={this.adicionarRemoverVeiculo} checked={this.state.adicionalVeiculo === true}></Checkbox>
                                    <span>Adicional Veículo</span>
                                </div>
                                <div class="ui-g-12 ui-md-4">
                                    <br /><br />
                                    <Button label="Entrar" onClick={this.checkinEntrar} />
                                </div>
                            </div>
                            <br />
                            <spam>*A data deve ser no formato ISO - Exemplo: 2018-11-12T08:30:00</spam>
                        </Panel>
                    </TabPanel>
                    <TabPanel header="Checkout">
                        <Panel header="Checkout">
                            <div class="ui-g">
                                <div class="ui-g-12 ui-md-4">
                                    <p>Data Saída:</p>
                                    <InputText id="dataSaída" onChange={(e) => { this.setState({ dataSaida: e.target.value }) }} value={this.state.dataSaida} maxLength="25" />
                                </div>
                                <div class="ui-g-12 ui-md-4">
                                    <br /><br />
                                    <Button label="Sair" onClick={this.checkinSair} />
                                </div>
                            </div>
                            <br />
                            <spam>*A data deve ser no formato ISO - Exemplo: 2018-11-12T08:30:00</spam>
                        </Panel>
                    </TabPanel>
                    <TabPanel header="Lista">
                        <Panel>
                            <div class="ui-g">
                                <div class="ui-g-12 ui-md-4">
                                    <Checkbox inputId="Listar Hospedados" onChange={this.alterarListarHospedados} checked={this.state.listarHospedados === true}></Checkbox>
                                    <span>Listar Hospedados</span>
                                </div>
                                <div class="ui-g-12 ui-md-4">
                                    <Button label="Consultar" onClick={this.listarHospedes} />
                                </div>
                            </div>
                        </Panel>
                        <br />
                        <DataTable value={this.state.listHospede} header={headerListaHospedes} responsive={true}>
                            <Column field="nome" header="Nome" sortable={true} style={{ width: '20%' }} />
                            <Column field="documento" header="Documento" sortable={true} style={{ width: '20%' }} />
                            <Column field="telefone" header="Telefone" sortable={true} style={{ width: '20%' }} />
                            <Column field="valorTotal" header="Vl.Total" sortable={true} style={{ width: '20%' }} />
                            <Column field="valorUltimaHospedagem" header="Vl.Ultima Hospedagem" sortable={true} style={{ width: '20%' }} />
                        </DataTable>
                    </TabPanel>
                </TabView>
            </div>
        );
    }
}

export default Hospede;