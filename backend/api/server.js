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

// [GET] /api/boards - Get all boards
server.get('/api/boards', async (req, res, next) => {
  try {
    const boards = await prisma.board.findMany({ include: { card: true } });
    res.json(boards);
  } catch (err) {
    next(err);
  }
});

// [POST] CREATE a board
server.post('/api/boards', async (req, res) => {
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

// [POST] /api/boards - edit an existing board
server.post('/api/boards', async (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return next({ status: 422, message: 'Board "name" is required and must be a string' });
  }

  try {
    const created = await prisma.board.create({ data: { name } });
    res.status(201).json(created);
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

  if (!name || typeof name !== 'string') {
    return next({ status: 422, message: 'Board "name" is required and must be a string' });
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
