class Venda < ActiveRecord::Base
  belongs_to :cliente
  # attr_accessible :title, :body
end
