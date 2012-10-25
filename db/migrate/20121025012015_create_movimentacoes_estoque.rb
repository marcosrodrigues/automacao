class CreateMovimentacoesEstoque < ActiveRecord::Migration
  def change
    create_table :movimentacoes_estoque do |t|
      t.references :produto
      t.integer :operacao
      t.integer :quantidade

      t.timestamps
    end
    add_index :movimentacoes_estoque, :produto_id
  end
end
