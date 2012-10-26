class CreateItensVenda < ActiveRecord::Migration
  def change
    create_table :itens_venda do |t|
      t.references :venda
      t.references :produto
      t.integer :quantidade

      t.timestamps
    end
    add_index :itens_venda, :venda_id
    add_index :itens_venda, :produto_id
  end
end
