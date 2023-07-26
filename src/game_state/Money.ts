export class Money {
  // TODO: migrate from Lua
  // local function new_money_increase_timer()
  //     return new_timer {
  //         start = u.fps * a.money_increase_seconds
  //     }
  // end
  //
  // local money_increase_timer = new_money_increase_timer()
  //
  // local s = {
  //     available = a.money_initial,
  // }
  //
  // function s.subtract(amount)
  //     s.available = s.available - amount
  // end
  //
  // function s.update()
  //     if money_increase_timer.has_finished() then
  //         s.available = s.available + 1
  //         money_increase_timer = new_money_increase_timer()
  //     end
  //
  //     money_increase_timer.update()
  // end
  //
  // return s
}
