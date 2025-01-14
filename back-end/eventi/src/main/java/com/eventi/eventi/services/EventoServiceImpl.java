/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */

package com.eventi.eventi.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventi.eventi.entities.Evento;
import com.eventi.eventi.repositories.EventoRepository;

@Service
public class EventoServiceImpl implements EventoService{

    @Autowired
    EventoRepository eventoRepository;

    /* -------------------------------------------------------------------------- */
    /*                                     ALL                                    */
    /* -------------------------------------------------------------------------- */
    @Override
    public List<Evento> getAllEventi(){
        List<Evento> eventi = eventoRepository.findAll();
        
        return eventi;
    }

    /* -------------------------------------------------------------------------- */
    /*                                  GET BY ID                                 */
    /* -------------------------------------------------------------------------- */

    @Override
    public Evento getEventoById(long id){
        Optional<Evento> optional = eventoRepository.findById(id);
        
        if(optional.isPresent()){
            Evento evento = optional.get();
            return evento;
        }else{
            return null;
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                                 GET BY NOME                                */
    /* -------------------------------------------------------------------------- */
    @Override
    public List<Evento> getEventiByNome(String nome){
        List<Evento> eventi = eventoRepository.findByNomeContainingIgnoreCase(nome);

        return eventi;
        
    }


    /* -------------------------------------------------------------------------- */
    /*                                 POST EVENTO                                */
    /* -------------------------------------------------------------------------- */

    @Override
    public Evento aggiungiEvento(Evento evento){
        evento.setId(0L);
        eventoRepository.save(evento);
        return evento;
    }


    /* -------------------------------------------------------------------------- */
    /*                                 PUT EVENTO                                 */
    /* -------------------------------------------------------------------------- */
    @Override
    public Evento aggiornaEvento(Evento evento, Evento trovato){
        trovato.setNome(evento.getNome());
        trovato.setTipologia(evento.getTipologia());
        trovato.setCaratteristiche(evento.getCaratteristiche());
        trovato.setDescrizione(evento.getDescrizione());
        trovato.setLuogoEvento(evento.getLuogoEvento());
        trovato.setCoordinateGPS(evento.getCoordinateGPS());
        trovato.setPosti(evento.getPosti());
        trovato.setDisponibilita(evento.isDisponibilita());
        trovato.setDataEvento(evento.getDataEvento());
        trovato.setPrezzo(evento.getPrezzo());

        eventoRepository.save(trovato);

        return evento;
    }


    /* -------------------------------------------------------------------------- */
    /*                               CANCELLA EVENTO                              */
    /* -------------------------------------------------------------------------- */
    @Override
    public void cancellaEvento(long id){
        eventoRepository.deleteById(id);

    }

}
