class ContaReceber < ActiveRecord::Base
  belongs_to :cliente
  attr_accessible :valor, :vencimento
end
