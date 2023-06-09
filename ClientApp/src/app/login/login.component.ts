import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UsuarioApiService } from '../services/usuarioApi.service';
import { AuthenticationAPIJson } from '../modelos/authenticationAPIJson';
import { environment } from '../../environments/environment';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioAPIJson } from '../modelos/usuarioAPIJson';
import { ClienteJson } from '../modelos/clienteJson';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  usuarioAPI: AuthenticationAPIJson;

  //form
  loginForm: FormGroup;
  enviado: boolean = false;
  resultadoPeticion: string;
  @ViewChild("myModalInfo", { static: false }) myModalInfo: TemplateRef<any>;

  constructor(private servicioLogin: UsuarioApiService, private formBuilder: FormBuilder,
    private modalService: NgbModal, private servicioCliente: ClienteService, private router: Router) {

    // ServicioProducto.obtenerClientes().subscribe(res => { console.log(res)});
    this.usuarioAPI = {
      email: environment.usuarioAPI,
      password: environment.passwordAPI
    }
  }

  ngOnInit()
  {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    if (sessionStorage.getItem('token') == null) {
      this.servicioLogin.loginAPI(this.usuarioAPI).subscribe(respuesta => {
        if (respuesta.error != null && respuesta.error != '')
          this.resultadoPeticion = respuesta.texto;
      })
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  Login() {
    this.enviado = true;
    if (this.loginForm.invalid) {
      console.log("Invalido");
      return;
    }

    let cliente: ClienteJson =
    {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    };

    
    this.servicioCliente.loginCliente(cliente).subscribe(
      respuesta => {
        if (respuesta.error != null && respuesta.error != '') {
          this.resultadoPeticion = respuesta.texto;
          this.modalService.open(this.myModalInfo);
        }
        else
        {
          this.router.navigate(['/producto']);
        }
    })
  }
}
