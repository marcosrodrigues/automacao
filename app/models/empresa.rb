class Empresa < ActiveRecord::Base
  attr_accessible :cnpj, :nome_fantasia, :razao_social, :sigla
end
