class PrecoProduto < ActiveRecord::Base
  belongs_to :produto
  attr_accessible :data, :preco
end
