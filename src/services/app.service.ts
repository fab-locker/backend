import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHomePage(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fablocker</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #18002d; 
            color: #594F62; 
            display: flex;
            flex-direction: column;
            height: 100vh;
        }

        header {
            background-color: #8256A0; 
            font-family: monospace;
            color: #F5F3F7; 
            text-align: center;
            padding: 1em;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            z-index: 1;
        }
        
        header h1 {
            color: #ffc000;
        }

        .container {
            display: flex;
            flex: 1;
            overflow: auto;
            padding: 20px;
        }

        .endpoints {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .endpoint {
            background-color: #8256A0; 
            color: #F5F3F7;
            margin-bottom: 20px;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: left;
        }

        h2 {
            color: #ffc000;
            font-size: 1.5em;
            font-family: monospace;
        }
        
        h3 {
            color: #e5a800;
            font-size: 1.2em;
            font-family: monospace;
        }

        .description {
            margin-bottom: 15px;
        }

        .parameters {
            margin-bottom: 15px;
        }

        .example {
            margin-bottom: 15px;
        }
    </style>
    </head>
    <body>
        <header>
            <h1>Fablocker</h1>
            <div class="description">
                <p>
                    Bienvenue sur l'API Fablocker.
                </p>
                <p>
                    Retrouvez ci-dessous la liste des endpoints disponibles pour intéragir avec les casiers.
                </p>
            </div>
        </header>
        <div class="container">
            <div class="endpoints">
            <!-- Premier Endpoint -->
                <div class="endpoint">
                    <h2>/endpoint</h2>
                     <div class="description">
                        <p>Description de ce que fait cet endpoint.</p>
                    </div>
                    <div class="parameters">
                        <h3>Paramètres :</h3>
                        <ul>
                            <li>param1 - Description du paramètre 1</li>
                            <li>param2 - Description du paramètre 2</li>
                        </ul>
                    </div>
                    <div class="example">
                        <h3>Exemple :</h3>
                        <p>Retours pour différents codes :</p>
                        <ul>
                            <li>200 - Succès</li>
                            <li>400 - Mauvaise requête</li>
                            <li>500 - Erreur interne du serveur</li>
                        </ul>
                    </div>
                </div>
            <!-- Ajoutez d'autres endpoints selon vos besoins -->
            
            </div>
        </div>
    </body>
</html>
`;
  }
}
