class VendaServico < ActiveRecord::Base
  belongs_to :venda
  belongs_to :servico
  attr_accessible :quantidade
end
