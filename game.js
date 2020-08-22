const TicTacToe = `
  #game {
    left
    right

    current

    readyCount = 0
  }

  #board { }

  <init> {
    (ready) {
      #game.readyCount = @player.ready ? #game.readyCount : #game.readyCount + 1
      #game.left = #game.readyCount == 1 ? @uid : #game.left
      #game.right = #game.readyCount == 2 ? @uid : #game.right

      @player.ready = true
      @player.sign = #game.readyCount == 1 ? "X" : "O"

      broadcast("game", #game)
      @state = every([#game.left, #game.right]) ? <playing> : @state
    }

    (leave) {
      #game.current = #game.left
      broadcast("game", #game)
    }
  }

  <playing> {
    (place) {
      assert(#game.current == @uid)
      assert(negate(get(#board, @payload)))
      set(#board, @payload, @player.sign)
      #game.current = #game.current == #game.left ? #game.right : #game.left
      broadcast("board", #board)
      broadcast("game", #game)
    }
  }
`;

export default TicTacToe;
