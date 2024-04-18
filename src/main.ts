import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

// IIFE: Immediately Invoked Function Expression (a function that calls itself).
// bootstrap(): Initializes and configures an application.
(async () => {
  try {
    const app = await NestFactory.create(AppModule); // Creates an application.

    const configService = app.get(ConfigService); // Gets the configuration service, more specific for env variables.

    const swaggerConfig = new DocumentBuilder() // Swagger configuration.
      .setTitle('arnia_estate_agency API')
      .setDescription('API made for personal project for Arnia.')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig); // Creates a Swagger document.
    SwaggerModule.setup('v1/docs', app, document); // Sets up the Swagger document and its route.

    app.setGlobalPrefix('v1'); // Sets the global prefix.

    app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // Adds a validation pipe to the application .

    await app.listen(configService.get('PORT') || 3000); // Starts the application.
  } catch (error) {
    console.log('An error occurred while running the application', error); // Logs the error.
  }
})();
