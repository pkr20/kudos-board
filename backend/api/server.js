//express
const express = require('express')
const server = express()

//prisma
const {PrismaClient} = require('../src/generated/prisma/client')
const prisma = new PrismaClient()

/// Cors stuff
const cors = require('cors')
server.use(cors());

server.use(express.json())


//BOARD ENDPOINTS
// [GET] /api/boards - Get all boards
server.get('/api/boards', async (req, res, next) => {
  try {
    const boards = await prisma.board.findMany({ include: { card: true } });
    res.json(boards);
  } catch (err) {
    next(err);
  }
});


// [GET] /api/boards/:id - Get a board by ID
server.get('/api/boards/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) 
    return next({ status: 400, message: 'Board ID must be a number' });

  try {
    const board = await prisma.board.findUnique({ where: { id }, include: { card: true } });
    if (board) {
      res.json(board);
    } else {
      next({ status: 404, message: `No board found with ID ${id}` });
    }
  } catch (err) {
    next(err);
  }
});


// [POST] CREATE a board
server.post('/api/boards', async (req, res, next) => {
     const { title, description, imgUrl, owner } = req.body;
     if (!title || !owner ){
      return next({
        status: 422,
        message: 'Board "title" and "owner" are required',
      });
     }
    try {
      const newBoard = await prisma.board.create({
        data: { title, description, imgUrl, owner }
      });
      res.json(newBoard);
    } catch (err) {
      next(err); 
    }
  });



// [PUT] /api/boards/:id - Update a board

server.put('/api/boards/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  const { title, description, imgUrl, owner } = req.body;

  if (isNaN(id)) 
    return next({ status: 400, message: 'Board ID must be a number' });

  if (title !== undefined && (typeof title !== 'string' || title.length === 0)) {
    return next({ status: 422, message: 'Board "title" must be a string' });
  }

  try {
    const board = await prisma.board.findUnique({ where: { id } });
    
    if (!board) {
      return next({ status: 404, message: `Board with ID ${id} not found` });
    }

    const updated = await prisma.board.update({
      where: { id },
      data: { title, description, imgUrl, owner }
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
});


// [DELETE] /api/boards/:id - Delete a board
server.delete('/api/boards/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) 
    return next({ status: 400, message: 'Board ID must be a number' });

  try {
    const board = await prisma.board.findUnique({ where: { id } });
    if (!board) {
      return next({ status: 404, message: 'Board not found' });
    }

    await prisma.board.delete({ where: { id } });
    res.json({ message: `Board with ID ${id} deleted` });
  } catch (err) {
    next(err);
  }
});


//CARD ENDPOINTS

// [GET] /api/cards - Get all cards
server.get('/api/cards', async (req, res, next) => {
  try {
    const cards = await prisma.card.findMany({ include: { board: true } });
    res.json(cards);
  } catch (err) {
    next(err);
  }
});

// [GET] /api/boards/:boardId/cards - Get all cards for a specific board
server.get('/api/boards/:boardId/cards', async (req, res, next) => {
  const boardId = Number(req.params.boardId);
  if (isNaN(boardId)) 
    return next({ status: 400, message: 'Board ID must be a number' });

  try {
    const cards = await prisma.card.findMany({ 
      where: { boardId },
      include: { board: true }
    });
    res.json(cards);
  } catch (err) {
    next(err);
  }
});

// [GET] /api/cards/:id - Get a card by ID
server.get('/api/cards/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) 
    return next({ status: 400, message: 'Card ID must be a number' });

  try {
    const card = await prisma.card.findUnique({ 
      where: { id }, 
      include: { board: true } 
    });
    if (card) {
      res.json(card);
    } else {
      next({ status: 404, message: `No card found with ID ${id}` });
    }
  } catch (err) {
    next(err);
  }
});


//[POST] /api/cards -Create a new card
server.post("/api/cards", async (req, res, next)=>{
  const {message, author, boardId} = req.body 
  if (!message || !author || !boardId) {
    return next({ status: 422, message: 'Message, author, and boardId required.'});
  }
  try {
    const created = await prisma.card.create({
      data: { message, author, boardId: Number(boardId) },
    });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});



//[DELETE] /api/cards/:id - deleting a card
server.delete("/api/cards/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) 
    return next({ status: 400, message: 'Card ID must be a number' });

  try {
    const card = await prisma.card.findUnique({ where: { id } });
    if (!card) {
      return next({ status: 404, message: 'Card not found' });
    }

    await prisma.card.delete({ where: { id } });
    res.json({ message: `Card with ID ${id} deleted` });
  } catch (err) {
    next(err);
  }
});

// [PUT] /api/cards/:id - Update a card
server.put("/api/cards/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  const { message, author } = req.body;
  if (isNaN(id)) {
    return next({ status: 400, message: "Card id must be a number" });
  }
  if (!message && !author) {
    return next({ status: 422, message: "Message/author is required." });
  }
  try {
    const card = await prisma.card.findUnique({ where: { id } });
    if (!card) {
      return next({ status: 404, message: "Card not found" });
    }
    const updatedCard = await prisma.card.update({
      where: { id },
      data: {
        message: message !== undefined ? message : card.message,
        author: author !== undefined ? author : card.author,
      },
    });
    res.json(updatedCard);
  } catch (err) {
    next(err);
  }
});

// [CATCH-ALL]
server.use((req, res, next) => {
  next({ status: 404, message: 'Not found' })
})

// Error handling middleware
server.use((err, req, res, next) => {
  const { message, status = 500 } = err
  console.log(message)
  res.status(status).json({ message })
})

module.exports = server
