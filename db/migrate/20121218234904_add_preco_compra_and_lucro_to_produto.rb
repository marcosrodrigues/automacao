class AddPrecoCompraAndLucroToProduto < ActiveRecord::Migration
  def change
    add_column :produtos, :preco_compra, :float
    add_column :produtos, :lucro, :float
  end
end
