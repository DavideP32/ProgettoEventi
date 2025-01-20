/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.eventi.eventi.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.eventi.eventi.entities.Evento;

public interface EventoService{

    List<Evento> getAllEventi();
    Evento getEventoById(long id);
    List<Evento> getEventiByNome(String nome);
    
    Evento aggiungiEvento(Evento evento);

    Evento aggiornaEvento(Evento evento, Evento trovato);
    Evento aggiornaPostiEvento (Evento trovato, int posti);
    void approvaEvento(long id);

    void cancellaEvento(long id);

    Evento saveEvento(Evento evento, MultipartFile multipartFile);
    
} 
