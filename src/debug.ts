// TODO: DEBUG STEP
// d = (function()
//     local is_toggle_button_pressed_already = false
//     local is_step_button_pressed_already = false
//
//     local s = {
//         is_next_frame = false,
//     }
//
//     function s.update()
//         -- Scan codes taken from https://fossies.org/linux/SDL2/include/SDL_scancode.h
//         local scancode_right_bracket = 48
//         local scancode_backslash = 49
//
//         if s.enabled then
//             s.is_next_frame = false
//             if stat(28, scancode_right_bracket) then
//                 if not is_step_button_pressed_already then
//                     s.is_next_frame = true
//                 end
//                 is_step_button_pressed_already = true
//             else
//                 is_step_button_pressed_already = false
//             end
//         end
//
//         if stat(28, scancode_backslash) then
//             if not is_toggle_button_pressed_already then
//                 s.enabled = not s.enabled
//             end
//             is_toggle_button_pressed_already = true
//         else
//             is_toggle_button_pressed_already = false
//         end
//     end
//
//     return s
// end)()
