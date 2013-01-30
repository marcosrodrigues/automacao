class Produto < ActiveRecord::Base
  belongs_to :tipo_produto
  has_many :precos_produto
  attr_accessible :codigo_barras, :descricao, :preco_venda, :quantidade, :tipo_produto, :preco_compra, :lucro

  def preco_atual
  	if PrecoProduto.find_by_produto_id(self.id)
  		PrecoProduto.where(:produto_id => self.id).order(:data).all.last.preco
  	else
  		0
  	end
  end
end
