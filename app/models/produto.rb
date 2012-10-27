class Produto < ActiveRecord::Base
  belongs_to :tipo_produto
  has_many :precos_produto
  attr_accessible :codigo_barras, :descricao, :preco_venda, :quantidade, :tipo_produto
end
