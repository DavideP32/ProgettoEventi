
package com.eventi.eventi.services;

import java.util.List;

import com.eventi.eventi.entities.Prenotazione;

public interface PrenotazioniService {

    public List<Prenotazione> getAllPreno();
    public Prenotazione aggiungiPrenotazione(Prenotazione prenotazione);
}
