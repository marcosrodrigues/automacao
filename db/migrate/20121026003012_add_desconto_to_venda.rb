class AddDescontoToVenda < ActiveRecord::Migration
  def change
    add_column :vendas, :desconto, :float, :default => 0
  end
end
