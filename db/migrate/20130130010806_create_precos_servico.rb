class CreatePrecosServico < ActiveRecord::Migration
  def change
    create_table :precos_servico do |t|
      t.references :servico
      t.date :data
      t.float :preco

      t.timestamps
    end
    add_index :precos_servico, :servico_id
  end
end
