import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
// import { ActivatedRoute} from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { ClienteJson } from '../modelos/clienteJson';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioApiService } from '../services/usuarioApi.service';
import { AuthenticationAPIJson } from '../modelos/authenticationAPIJson';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cliente-component',
  templateUrl: './cliente.component.html'
})

export class ClienteComponent{

  altaForm: FormGroup;
  enviado: boolean = false;
  resultadoPeticion: string;
  @ViewChild("myModalInfo", { static: false }) myModalInfo: TemplateRef<any>;
  usuarioAPI: AuthenticationAPIJson;

  constructor(private servicioCliente: ClienteService, private formBuilder: FormBuilder, private modalService: NgbModal, private servicioLogin: UsuarioApiService)
  {
    this.usuarioAPI = {
      email: environment.usuarioAPI,
      password: environment.passwordAPI
    }
  }

  ngOnInit(): void /*pass value to form controls */ 
  {
    this.altaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    if (sessionStorage.getItem('token') == null) {
      this.servicioLogin.loginAPI(this.usuarioAPI).subscribe(respuesta => {
        if (respuesta.error != null && respuesta.error != '')
          console.log("Error al obtener token");
      })
    }
  }
   
  get formulario(): { [key: string]: AbstractControl }
  {
    return this.altaForm.controls;
  }


  public AgregarCliente()
  {
    console.log("cliente component ts : AgregarCliente metodo");
    this.enviado = true;
    if (this.altaForm.invalid) {
      console.log("invalido");
      return;
    }
    console.log("valido");

    let cliente: ClienteJson =
    {
      nombre: this.altaForm.controls['nombre'].value,
      email: this.altaForm.controls['email'].value,
      password: this.altaForm.controls['password'].value
    };

    this.servicioCliente.agregarClientes(cliente).subscribe(res => {
      if (res.error != null && res.error != '')
        this.resultadoPeticion = res.texto;
      else
        this.resultadoPeticion = "Cliente dado de alta correctamente. Inicie sesion";

      this.modalService.open(this.myModalInfo);
    });
  }
}
