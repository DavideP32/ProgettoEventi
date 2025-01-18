/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.eventi.eventi.login;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import com.eventi.eventi.entities.Prenotazione;
import com.eventi.eventi.enums.Ruolo;

@Component
@SessionScope
public class SessioneUtente implements Serializable{

    private long utente_id;
	private String nome;
    private String cognome;
	private String email;
    private LocalDate dataNascita;
	private Ruolo ruolo;
    private List<Prenotazione> prenotazioni;

    public SessioneUtente(long utente_id, String nome, String cognome, String email, LocalDate dataNascita, Ruolo ruolo, List<Prenotazione> prenotazioni) {
        this.utente_id = utente_id;
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.dataNascita = dataNascita;
        this.ruolo = ruolo;
        this.prenotazioni = prenotazioni;
    }



    public long getId() {
        return utente_id;
    }

    public void setId(long utente_id) {
        this.utente_id = utente_id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Ruolo getRuolo() {
        return ruolo;
    }

    public void setRuolo(Ruolo ruolo) {
        this.ruolo = ruolo;
    }

    public long getUtente_id() {
        return utente_id;
    }

    public void setUtente_id(long utente_id) {
        this.utente_id = utente_id;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public LocalDate getDataNascita() {
        return dataNascita;
    }

    public void setDataNascita(LocalDate dataNascita) {
        this.dataNascita = dataNascita;
    }

    public List<Prenotazione> getPrenotazioni() {
        return prenotazioni;
    }

    public void setPrenotazioni(List<Prenotazione> prenotazioni) {
        this.prenotazioni = prenotazioni;
    }


}
