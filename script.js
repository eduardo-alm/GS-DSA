var historico = [];
  
function mostrar(html) {
    document.getElementById("resultado").innerHTML = html;
}

function inserirDados() {
    var temperatura  = parseFloat(document.getElementById("temperatura").value);
    var energia      = parseFloat(document.getElementById("energia").value);
    var comunicacao  = parseInt(document.getElementById("comunicacao").value);

      
    if (isNaN(temperatura) || isNaN(energia)) {
     mostrar('<span class="alerta">Preencha temperatura e energia!</span>');
     return;
    }

    var leitura = {
        temperatura: temperatura,
        energia:     energia,
        comunicacao: comunicacao
      };
    
      historico.push(leitura);

    mostrar('<span class="ok">✓ Leitura #' + historico.length + ' registrada!</span>\n\n' + verificarAlertas(leitura));
}

    
function verificarAlertas(leitura) {
    var texto = "";

    if (leitura.temperatura > 80) {
     texto += '<span class="alerta">⚠ ALERTA: Superaquecimento! Temperatura = ' + leitura.temperatura + '°C</span>\n';
    }
    if (leitura.energia < 20) {
     texto += '<span class="aviso">⚠ ALERTA: Energia crítica! Nível = ' + leitura.energia + '%</span>\n';
    }
    if (leitura.comunicacao == 0) {
     texto += '<span class="alerta">⚠ ALERTA: Falha de comunicação!</span>\n';
    }
    if (texto === "") {
     texto = '<span class="ok">✓ Todos os sistemas normais.</span>';
    }

     return texto;
}

    
function verStatus() {
    if (historico.length === 0) {
      mostrar('<span class="info">Nenhuma leitura registrada ainda.</span>');
      return;
    }

    var ultima = historico[historico.length - 1];
    var com    = ultima.comunicacao == 1 ? '<span class="ok">OK</span>' : '<span class="alerta">FALHA</span>';

    var texto = "--- STATUS ATUAL (leitura #" + historico.length + ") ---\n\n";
    texto += "Temperatura  : " + ultima.temperatura + " °C\n";
    texto += "Energia      : " + ultima.energia + " %\n";
    texto += "Comunicação  : " + com + "\n\n";
    texto += verificarAlertas(ultima);

    mostrar(texto);
}

function verHistorico() {
    if (historico.length === 0) {
      mostrar('<span class="info">Nenhuma leitura no histórico.</span>');
      return;
    }

    var texto = "--- HISTÓRICO DE LEITURAS ---\n\n";

    for (var i = 0; i < historico.length; i++) {
     var l   = historico[i];
     var com = l.comunicacao == 1 ? "OK" : "FALHA";
     texto += "Leitura #" + (i + 1) + ":  ";
     texto += "Temp=" + l.temperatura + "°C  ";
     texto += "Energia=" + l.energia + "%  ";
     texto += "Com=" + com + "\n";
    }

    mostrar(texto);
}

function executarAnalise() {
    if (historico.length < 2) {
      mostrar('<span class="aviso">Precisa de ao menos 2 leituras para analisar.</span>');
      return;
    }

    var somaTemp = 0;
    for (var i = 0; i < historico.length; i++) {
      somaTemp = somaTemp + historico[i].temperatura;
    }
      
    var mediaTemp = somaTemp / historico.length;

    var somaEnergia = 0;
    for (var i = 0; i < historico.length; i++) {
      somaEnergia = somaEnergia + historico[i].energia;
    }
    var mediaEnergia = somaEnergia / historico.length;

    
    var alertasTemp = 0;
    var alertasEner = 0;
    var alertasCom  = 0;

    for (var i = 0; i < historico.length; i++) {
    if (historico[i].temperatura > 80) alertasTemp++;
    if (historico[i].energia < 20)     alertasEner++;
    if (historico[i].comunicacao == 0) alertasCom++;
    }

    var texto = "--- ANÁLISE (" + historico.length + " leituras) ---\n\n";
    texto += "Média de temperatura  : " + mediaTemp.toFixed(1) + " °C\n";
    texto += "Média de energia      : " + mediaEnergia.toFixed(1) + " %\n\n";
    texto += "Alertas de superaquecimento : " + alertasTemp + "\n";
    texto += "Alertas de energia crítica  : " + alertasEner + "\n";
    texto += "Falhas de comunicação       : " + alertasCom + "\n";

    mostrar(texto);
}

    
function limparHistorico() {
    historico = [];
    mostrar('<span class="ok">Histórico apagado.</span>');
}

