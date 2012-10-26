class ItemVenda < ActiveRecord::Base
  belongs_to :venda
  belongs_to :produto
  attr_accessible :quantidade
end
