class Venda < ActiveRecord::Base
  belongs_to :cliente
  has_many :item_venda
  # attr_accessible :title, :body
end
