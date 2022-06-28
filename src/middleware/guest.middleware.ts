import { Request, Response, NextFunction, Router } from "express";

export const guestValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(req.body){
      let err;
      if(!req.body.firstName) err = { id: 1, msg: "Der Vorname wurde nicht an die Schnittstelle übertragen!"}; 
      if(!req.body.lastName) err = { id: 1, msg: "Der Nachname wurde nicht an die Schnittstelle übertragen!"}; 
      if(!req.body.duration) err = { id: 1, msg: "Die Dauer des Netzwerkzugangs wurde nicht an die Schnittstelle übertragen!"}; 
      if(!req.body.company) err = { id: 1, msg: "Der Name des Unternehmen wurde nicht an die Schnittstelle übertragen!"}; 
      if(!err){
        next();
      }else{
        res.json(err)
      }
    }else{    
      res.json({
        id: 1,
        msg: "Es wurden keine Daten an die Schnittstelle übertragen!",
      });
    }
  } 