class CreateContasPagar < ActiveRecord::Migration
  def change
    create_table :contas_pagar do |t|
      t.references :fornecedor
      t.date :vencimento
      t.float :valor

      t.timestamps
    end
    add_index :contas_pagar, :fornecedor_id
  end
end
