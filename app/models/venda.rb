class Venda < ActiveRecord::Base
  belongs_to :cliente
  has_many :item_venda
  has_many :venda_servico
  # attr_accessible :title, :body
end
