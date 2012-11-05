class VendasReport < Prawn::Document
  def recibo_to_pdf(venda)
    text venda.created_at.to_s

    itens = [["Produto"]]

    itens += venda.item_venda.map do |i|
      [
          i.produto.descricao
      ]
    end

    table itens, :header => true, :row_colors => ["F0F0F0", "FFFFCC"]

    render
  end
end