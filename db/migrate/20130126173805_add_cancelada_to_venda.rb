class AddCanceladaToVenda < ActiveRecord::Migration
  def change
  	add_column :vendas, :cancelada, :boolean, :default => false
  end
end
