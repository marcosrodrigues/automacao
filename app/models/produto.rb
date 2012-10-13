class Produto < ActiveRecord::Base
  belongs_to :tipo_produto
  attr_accessible :codigo_barras, :descricao, :preco_venda
end
