const errorHandler = (error, req, res, next) => {
  if (
    error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    res.status(400).json({
      message: error.errors[0].message,
    });
  } else if (error.name === 'Email is required') {
    res.status(400).json({ message: 'Email is required' });
  } else if (error.name === 'Password is required') {
    res.status(400).json({ message: 'Password is required' });
  } else if (error.name === 'Invalid email/password') {
    res.status(401).json({ message: 'Invalid email/password' });
  } else if (error.name === 'Invalid token') {
    res.status(401).json({ message: 'Invalid token' });
  } else if (
    error.name === 'SequelizeUniqueConstraintError' ||
    error.name === 'SequelizeValidationError'
  ) {
    res.status(400).json({ message: error.errors[0].message });
  } else if (error.name === 'EMAIL_REQUIRED') {
    res.status(400).json({ message: 'Email is required' });
  } else if (error.name === 'PASSWORD_REQUIRED') {
    res.status(400).json({ message: 'Password is required' });
  } else if (error.name === 'INVALID_DATA') {
    res.status(401).json({ message: 'Invalid email or password' });
  } else if (error.name === 'NOT_FOUND') {
    res.status(404).json({ message: 'Entity not found!' });
  } else if (
    error.name === 'INVALID_TOKEN' ||
    error.name === 'JsonWebTokenError'
  ) {
    res.status(401).json({ message: 'Invalid token' });
  } else if (error.name === 'FORBIDDEN') {
    res.status(403).json({ message: 'You are not authorized' });
  } else if (error.name === 'MidtransError') {
    res.status(400).json({ message: err.ApiResponse.error_messages[0] });
  }
  else if (error.name === 'Service not found') {
    res.status(404).json({ message: 'Service not found please input the right number' })
  }
  else if (error.name === 'Status already changed to completed!') {
    res.status(200).json({
      message: 'Status already changed to completed!'
    })
  }
  else {
    res.status(500).json({ message: "Internal Server Error" })
  }

}



module.exports = errorHandler;
