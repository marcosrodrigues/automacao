# encoding: utf-8

class MigraServicoTecMotos < ActiveRecord::Migration
  def up
    if Empresa.first.sigla == 'TEC'
      Servico.create(:descricao => 'PASTILHAS FREIO')
      Servico.create(:descricao => 'FREIO')
      Servico.create(:descricao => 'KIT TRANSM')
      Servico.create(:descricao => 'GUIDAO')
      Servico.create(:descricao => 'ESTRIBO')
      Servico.create(:descricao => 'LIMPEZA CHAVE DE LUZ')
      Servico.create(:descricao => 'FILTRO DE AR')
      Servico.create(:descricao => 'REVISAO BROS/XLR/CBX200/NX')
      Servico.create(:descricao => 'CABEÇOTE')
      Servico.create(:descricao => 'BLOCO OPTICO')
      Servico.create(:descricao => 'SOLDA')
      Servico.create(:descricao => 'RET MESA')
      Servico.create(:descricao => 'BIELA')
      Servico.create(:descricao => 'MOLA TENSOR CORRENTE')
      Servico.create(:descricao => 'IGNICAO')
      Servico.create(:descricao => ' PAINEL')
      Servico.create(:descricao => 'ROLAMENTOS')
      Servico.create(:descricao => 'BENGALA')
      Servico.create(:descricao => 'CX  DIREC')
      Servico.create(:descricao => 'POLIMENTO')
      Servico.create(:descricao => 'PISCA')
      Servico.create(:descricao => 'REVISAO HONDA,YA 100/125/SHINERAY/SUNDOW')
      Servico.create(:descricao => ' MOTOR')
      Servico.create(:descricao => 'CAMISA')
      Servico.create(:descricao => 'RABETA')
      Servico.create(:descricao => 'SUPORTE PISCA')
      Servico.create(:descricao => 'REG DE VALVULA')
      Servico.create(:descricao => 'REG FREIO')
      Servico.create(:descricao => 'LUBRIFICAR BALANCA TIT')
      Servico.create(:descricao => 'LUBRIFICAR BALANCA XLR')
      Servico.create(:descricao => 'LAMP PAINEL')
      Servico.create(:descricao => 'CAPA/TANQUE')
      Servico.create(:descricao => 'INSTALACAO ELETRICA')
      Servico.create(:descricao => 'DESENPENAR AROS')
      Servico.create(:descricao => 'ACELERADOR')
      Servico.create(:descricao => 'RET EMBR')
      Servico.create(:descricao => 'BUCHA COROA')
      Servico.create(:descricao => 'PUNHO')
      Servico.create(:descricao => 'EMBL FRONTAL FAN')
      Servico.create(:descricao => 'MOTOR DE PARTIDA')
      Servico.create(:descricao => 'FIBRA')
      Servico.create(:descricao => 'ENRRAIAR ARO')
      Servico.create(:descricao => 'CORTE CORRENTE')
      Servico.create(:descricao => 'REBOQUE')
      Servico.create(:descricao => 'ESCAPE')
      Servico.create(:descricao => 'EIXO CAVALETE CENTRAL')
      Servico.create(:descricao => 'ENGR VELOC')
      Servico.create(:descricao => 'CUBO RODA DIANT')
      Servico.create(:descricao => 'ESCOVA DE PART')
      Servico.create(:descricao => 'CORRENTE COMANDO')
      Servico.create(:descricao => 'REVISAO XT 225/XTZ')
      Servico.create(:descricao => 'TENSOR CORRENTE TRANSM')
      Servico.create(:descricao => 'CUBO RODA TRAS')
      Servico.create(:descricao => 'MOTOR-SERRA')
      Servico.create(:descricao => 'PEDAL')
      Servico.create(:descricao => 'CARBURADOR')
      Servico.create(:descricao => 'EIXO PINHAO 99/00')
      Servico.create(:descricao => 'CAVAL CENTRAL')
      Servico.create(:descricao => 'MAGNETO')
      Servico.create(:descricao => 'EXTRAIR PARAFUSOS')
      Servico.create(:descricao => 'ALINHAMENTO')
      Servico.create(:descricao => 'OUTRO SERVIÇO')
      Servico.create(:descricao => 'EMBREAGEM')
      Servico.create(:descricao => 'REVISAO CG 250 A 600')
      Servico.create(:descricao => 'PINO CAVALETE CENTRAL')
      Servico.create(:descricao => 'VALVULAS')
      Servico.create(:descricao => 'ALINHAR BIELA')
      Servico.create(:descricao => 'RET CAMBIO')
      Servico.create(:descricao => 'BANCO')
      Servico.create(:descricao => 'DESCARBONIZACAO')
      Servico.create(:descricao => ' VELOCIMETRO')
      Servico.create(:descricao => 'BOBINA')
      Servico.create(:descricao => 'BATERIA')
      Servico.create(:descricao => 'VARETAS DE VALV')
      Servico.create(:descricao => 'CHAVE DE LUZ')
      Servico.create(:descricao => 'ROSCAS')
      Servico.create(:descricao => 'CORREIA TRAS MOBYLETE')
      Servico.create(:descricao => 'BALANÇA')
      Servico.create(:descricao => 'SELETOR PARTIDA')
      Servico.create(:descricao => 'RET PINHAO')
      Servico.create(:descricao => 'PATIM FREIO')
      Servico.create(:descricao => 'TRAVA GUIDAO')
      Servico.create(:descricao => 'SANFONA')
      Servico.create(:descricao => 'PNEU')
      Servico.create(:descricao => 'OLEO MOTOR')
      Servico.create(:descricao => 'ARO FAROL')
      Servico.create(:descricao => 'LENTE RETROV')
      Servico.create(:descricao => 'IGNICAO TIT 150')
      Servico.create(:descricao => 'ALONGADOR')
      Servico.create(:descricao => 'MOLA PEDAL PARTIDA')
      Servico.create(:descricao => ' MOLA EXTERNA')
      Servico.create(:descricao => ' FAROL')
      Servico.create(:descricao => 'EXTRA')
      Servico.create(:descricao => 'VELOCIMETRO')
      Servico.create(:descricao => 'PROT DIANT')
      Servico.create(:descricao => 'REG VALV XR 200')
      Servico.create(:descricao => 'MONTAGEM')
      Servico.create(:descricao => 'ENCAMISAMENTO')
      Servico.create(:descricao => 'PINTURA')
      Servico.create(:descricao => 'INSTALAR SLED')
      Servico.create(:descricao => 'MOTOR')
      Servico.create(:descricao => 'PAINEL')
      Servico.create(:descricao => 'FAIXA DE AROS')
      Servico.create(:descricao => 'FAROL')
      Servico.create(:descricao => 'ALÇA')
      Servico.create(:descricao => 'BAGAGEIRO')
      Servico.create(:descricao => 'BUZINA')
      Servico.create(:descricao => 'TPAS LATERAIS')
      Servico.create(:descricao => 'PEDALEIRAS TRAS')
      Servico.create(:descricao => 'TANQUE')
      Servico.create(:descricao => 'EIXO PEDAL DO CAMBIO')
      Servico.create(:descricao => 'CORRENTE')
      Servico.create(:descricao => 'PINHAO')
      Servico.create(:descricao => 'AMORTECEDORES')
      Servico.create(:descricao => 'PARALAMA')
      Servico.create(:descricao => 'EIXO DIANT')
      Servico.create(:descricao => 'EIXO TRAS')
      Servico.create(:descricao => 'COROA TRANSM')
      Servico.create(:descricao => 'ALARME')
      Servico.create(:descricao => 'CAVAL LATERAL')
      Servico.create(:descricao => 'COMBUSTIVEL')
      Servico.create(:descricao => 'VAZAMENTOS')
      Servico.create(:descricao => 'MANETE/MANICOTO')
      Servico.create(:descricao => 'CABOS')
      Servico.create(:descricao => 'RETIFICA')
      Servico.create(:descricao => 'SLED')
      Servico.create(:descricao => 'PLACA')
      Servico.create(:descricao => 'CAMBIO')
      Servico.create(:descricao => 'RODA TRAS')
      Servico.create(:descricao => 'RODA DIANT')
      Servico.create(:descricao => 'GERAIS')
      Servico.create(:descricao => 'INJEÇÃO ELETR')
      Servico.create(:descricao => 'ESTATOR')
      Servico.create(:descricao => 'REVISÃO COM INJEÇÃO')
    end
  end

  def down
    if Empresa.first.sigle == 'TEC'
      Servico.delete_all
    end
  end
end