// TODO: do we even need this class?
export class Text {
  // TODO: migrate from Lua
  // local sprites = {}
  // for i = 1, #text_value do
  //     local char = sub(text_value, i, i)
  //     local sprite = a.font_sprites[char]
  //     add(sprites, { x = sprite[1], y = sprite[2], w = sprite[3] or 3 })
  // end
  //
  // local s = {
  //     w = 0,
  // }
  //
  // for sprite in all(sprites) do
  //     s.w = s.w + sprite.w + 1
  // end
  // s.w = max(0, s.w - 1)
  //
  // function s.draw(x, y, color)
  //     local current_x = x
  //     for index, sprite in pairs(sprites) do
  //         local c = type(color) == "function" and color(index, #text_value) or color
  //         pal(a.font_template_color, c, 0)
  //         sspr(sprite.x, sprite.y, sprite.w, u.th, current_x, y)
  //         pal(a.font_template_color, a.font_template_color, 0)
  //         current_x = current_x + sprite.w + 1
  //     end
  // end
  //
  // return s
}
