class ContaPagar < ActiveRecord::Base
  belongs_to :fornecedor
  attr_accessible :valor, :vencimento
end
