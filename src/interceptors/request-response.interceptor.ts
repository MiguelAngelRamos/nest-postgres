import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
// Gestion de archivos
import * as fs from 'fs/promises'; // Es para operaciones de archivos asincronas
import * as path from "path";


@Injectable()
export class RequestResponseInterceptor implements NestInterceptor {

  // Definir las rutas del directorio y archivo logs que vamos a generar
  private readonly logDir = path.resolve(process.cwd(), 'logs');
  private readonly logPath = path.join(this.logDir, 'request-response.log');

  constructor() {
    this.initLogDirectory();
  }


  //* Método para inicializar el directorio de logs.
  private async initLogDirectory() {
    try {
      // Imprime la ruta del directorio y archivo de logs.
      console.log(`Log directory path: ${this.logDir}`);
      console.log(`Log file path: ${this.logPath}`);

      // Verificar si el directorio de logs existe, Si no existe lo vamos a crear
      if (!(await fs.access(this.logDir).then(() => true).catch(() => false))) {
        console.log('Log direcoty does not exist, creating...');
        await fs.mkdir(this.logDir, { recursive: true });
        console.log('Log directory created');
      } else {
        console.log('Log directory already exits');
      }
    } catch (err) {
      console.error('Error initializing log directory:', err);
    }
  }

  //* Método para obtener la fecha y hora actuales
  private getCurrentTimestamp(): string {
    return new Date().toISOString();
  }

  //* Método intercept que se ejecuta cada vez que se realiza una solicitud HTTP
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {

    // Obtener la solicitud http actual
    const request = context.switchToHttp().getRequest();
    const method = request.method; // HTTP(GET, POST, PATCH, DELETE)
    const url = request.url; // Obtiene la URL de la solicitud.

    //* Crear un mensaje de log de la solicitud entrante al archivo de manera asíncrona.
    const logMessage = `[${this.getCurrentTimestamp()}] Incoming Request: ${method} ${url}\n`;

    fs.appendFile(this.logPath, logMessage)
      .then(() => console.log('Log message written to file'))
      .catch(err => console.error('error writing log message to file', err));
    
    const now = Date.now(); // Registra el tiempo actual para medir la duracion de solicitud

    return next
        .handle()
        .pipe(
          tap(() => {
            const response = context.switchToHttp().getRequest();
            const statusCode = response.statusCode;
            const logResponseMessage = `Outgoing Response: ${statusCode} ${method} ${url} - ${Date.now() - now}ms\n`;

            //* Agregar los logs de la respuesta al archivo de logs
            try {
              fs.appendFile(this.logPath, logResponseMessage);
              console.log('Response log message written to file');
            } catch (error) {
              console.error(`Error writing response log message to file: ${error}`);
            }
          })
        )
  }
}