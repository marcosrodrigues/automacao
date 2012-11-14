class AddFechadaToVenda < ActiveRecord::Migration
  def change
    add_column :vendas, :fechada, :boolean, :default => false
  end
end
