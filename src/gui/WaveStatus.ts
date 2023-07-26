export class WaveStatus {
  // TODO: migrate from Lua
  // local waves = u.r(params.waves)
  //
  // -- TODO: label slide in and slide out animation
  // return {
  //     draw = function()
  //         if waves.current_wait() then
  //             local wave_label = new_text("wave " .. waves.wave_number())
  //
  //             local progress = waves.current_wait().progress()
  //             local progress_width_max = wave_label.w
  //             local progress_width = flr(progress * progress_width_max)
  //             local progress_x = u.vs / 2 - ceil(progress_width_max / 2)
  //             local progress_y = a.wb - 2
  //
  //             wave_label.draw(progress_x, progress_y - u.th - 1, a.colors.brown_purple)
  //
  //             if progress_width > 0 then
  //                 line(progress_x, progress_y, progress_x + progress_width - 1, progress_y, a.colors.brown_purple)
  //             end
  //         elseif waves.current_wave() then
  //             local wave_label = new_text("wave " .. waves.wave_number())
  //
  //             local progress = waves.current_wave().progress()
  //             local progress_width_max = wave_label.w
  //             local progress_width = flr(progress * progress_width_max)
  //             local progress_x = u.vs / 2 - ceil(progress_width_max / 2)
  //             local progress_y = a.wb - 2
  //
  //             wave_label.draw(
  //                 progress_x,
  //                 progress_y - u.th - 1,
  //                 a.colors.grey_light
  //             )
  //
  //             local gap = 1
  //             local remaining_progress_width = progress_width_max - progress_width - gap
  //
  //             if progress_width > 0 then
  //                 line(progress_x, progress_y, progress_x + progress_width - 1, progress_y, a.colors.salmon)
  //             end
  //             if remaining_progress_width > 0 then
  //                 line(progress_x + progress_width_max - remaining_progress_width, progress_y, progress_x + progress_width_max - 1, progress_y, a.colors.brown_purple)
  //             end
  //         end
  //     end,
  // }
}
