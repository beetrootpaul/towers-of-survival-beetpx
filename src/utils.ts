// TODO: migrate from Lua
// u = {
//     button_o = 4,
//     button_x = 5,
//     button_menu = 6,
//
//     fps = 60,
//
//     -- text height
//     th = 4,
// }
//
// u.arrow_buttons_to_directions = {
//     [0] = { x = -1, y = 0 },
//     [1] = { x = 1, y = 0 },
//     [2] = { x = 0, y = -1 },
//     [3] = { x = 0, y = 1 },
// }
//
// function u.noop()
//     -- do nothing
// end
//
// -- assert if required value is there and returns it
// function u.r(value)
//     if type(value) == "boolean" then
//         assert(value ~= nil, "required value is missing")
//     else
//         assert(value, "required value is missing")
//     end
//     return value
// end
