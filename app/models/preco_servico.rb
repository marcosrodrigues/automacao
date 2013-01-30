class PrecoServico < ActiveRecord::Base
  belongs_to :servico
  attr_accessible :data, :preco
end
