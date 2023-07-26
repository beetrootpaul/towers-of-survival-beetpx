// TODO: migrate from Lua
// d = (function()
//     local is_toggle_button_pressed_already = false
//     local is_step_button_pressed_already = false
//
//     local s = {
//         enabled = false,
//         is_next_frame = false,
//     }
//
//     -- Based on #printh_helpers cart (https://www.lexaloffle.com/bbs/?tid=42367)
//     function s.log_string_from_args(...)
//         local args = pack(...)
//         if #args == 0 then
//             return ""
//         elseif #args == 1 then
//             return type(args[1]) == "table"
//                 and s.log_string_from_table(args[1])
//                 or tostr(args[1])
//         else
//             local t = ""
//             for i = 1, args.n do
//                 t = t .. (s.log_string_from_args(args[i])) .. " "
//             end
//             return t
//         end
//     end
//
//     -- Based on #printh_helpers cart (https://www.lexaloffle.com/bbs/?tid=42367)
//     function s.log_string_from_table(table)
//         local t = "{"
//         for key, value in pairs(table) do
//             t = t .. s.log_string_from_args(key)
//             t = t .. "=" .. s.log_string_from_args(value)
//             t = t .. ","
//         end
//         return t .. "}"
//     end
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
//     function s.log(...)
//         if s.enabled then
//             printh(s.log_string_from_args(...))
//         end
//     end
//
//     return s
// end)()
