/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.eventi.eventi.services;

import java.util.List;

import com.eventi.eventi.entities.Evento;

public interface EventoService{

    public List<Evento> getAllEventi();
    public Evento getEventoById(long id);
    public List<Evento> getEventiByNome(String nome);
    
    public Evento aggiungiEvento(Evento evento);

    public Evento aggiornaEvento(Evento evento, Evento trovato);
    
} 
