
# Tots Test Project

Pequeña integracion de bibliotecas Tots y servicios con el objetivo de crear una tabla editable con formularios custom.


## Detalle de horas y tareas : 
Aprox 7 - 8 horas

¿ Que hice ?

 1) Clone los respositorios otorgados :  forms / table, y estuve un buen rato tratando de montarlos y correrlos. Y monte el proyecto general.
Use npm install, downgradie mi CLI con nvm y tambien arregle varios errores de importaciones en la branch main clonada, para poder correrlos local .
Ej 
```javascript
import { TotsFormModule } from '@tots/form';
To
import { TotsFormModule } from 'projects/tots/form/src/lib/form.module';

```
A si mismo, en mi proyecto test principal, instale las bibliotecas form y tables, y tuve que instalar algunas dependencias para montar las visuales y demas funcionamientos correctamente : 

```javascript
"parse5": "^7.1.2"
"@angular/material": "~16.2.11"
"@angular/cdk": "^16.2.11"
```
Todo esto me demoro algunas 2 horas aprox, ya que sin la documentacion tuve que revisar bien todos los imports para entender que versiones instalar correctamente en mi repo y de paso me puse a probar como funcionaban las librerias por pura curiosidad.

2) Empece la maquetacion de mi proyecto, en base a las tareas solicitadas.
- Cree componentes de Login, uno principal para montar la tabla y uno de registro.
- Cree servicios de auth y de cliente para montar los endpoints otorgados.
- Algunas interfaces de Cliente y Registro (Despues me di cuenta que estaban las Entities)

3) Empece a imaginar como montar mis componentes en base a lo solicitado.
- Pense en utilizar TotsFormModalService para el modal de creacion y edicion de clientes y de utilizar el formulario custom para el registro y login, como para utilizar las dos opciones.
- Lei el example del componente de Table y empece a montarlo en mi componente principal junto con las logicas que iba a utilizar.

4) Cree, conecte y testie los endpoints otorgados y empece con las logicas basicas para utilizarlos. Empece por la tabla, segui con el form y una vez terminado lo importante termine el login y el register. 

6) Me dedique a agregar algunos detalles visuales, aunque este no fue el fuerte de este ejercicio .

7) Limpie un poco el codigo, repase todos los puntos del Pdf, fixie algunos errores del modal de Registro al postear y agrege el modal de eliminar.

8) Encare el deploy y termine el readme 

9) Update 4/28

Luego de entregar el proyecto el dia viernes 4/27, actualizo con algunas mejoras :

- Para utilizar un ejemplo de pipe async, implemente en la response del login, un pipe async para renderizar el errorMessage.
- Agrege validadores para espacios en blanco en los forms de creacion de clientes.


Los detalles mas tecnicos de como lidie con las logicas de los componentes los conversamos luego asi no hago tan largo el readme.

¿ Que no pude hacer ?
- Unit testing de los servicios de auth, @tots/core no me lo permitio . (No habia visto los providers, si bien no es correcto hacer unit testing con providers externos, entiendo que los que estan en este proyecto son mockeados y arme un unit test sencillo con los mismos)
- Pipes asyncronos para manejar la data de la tabla, me trajo algunos problemas con la biblio y preferi no embrollarme, si conversamos mas adelante me gustaria charlar como lograr eso, de ser posible.
- Se me ocurrio utilizar algun state controler para la app, como Redux o Subjects, pero simplemente fui por observables porque me parecio mas simple para este caso.
- No logre hacer funcionar el paginado de la tabla, ni en mi proyecto ni en el Example.
- Meterme demasiado en la validacion del formulario de registro, esta bastante debil la creacion de usuarios de mi aplicacion, entiendo que de querer validar emails y demas deberia trabajar en la biblioteca de forms x).

## Principales desafios :
1) Creo que el principal desafio de la tarea fue dominar las bibliotecas Tots, entender como funcionaban la Table, el Form y el ModalForm y que recursos de configuracion iba a necesitar utilizar en mi propio proyecto.

2) Estuve un buen rato intentando arreglar y downgradear, problemas causados por utilizar un CLI version mas alta al principio del proyecto, y tambien instale una version erronea de angular material que me trajo un par de dolores de cabeza.


## To Run My Project :

- git clone https://github.com/herwing0/Tots-Angular-Test.git 
- npm install
- npm run start

## Deploy en Vercel :

- https://tots-angular-test-add8dhvab-herwing0s-projects.vercel.app/

Gracias por todo, fue un ejercicio muy divertido, mientanme y diganme que leyeron todo!
