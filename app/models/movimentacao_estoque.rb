class MovimentacaoEstoque < ActiveRecord::Base
  belongs_to :produto
  attr_accessible :operacao, :quantidade
end
