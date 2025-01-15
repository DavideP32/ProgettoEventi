/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.eventi.eventi.dtos;

import java.time.LocalDate;
import java.util.List;

import com.eventi.eventi.entities.Prenotazione;
import com.eventi.eventi.enums.Ruolo;

public class UtenteDto {

    private long id;
    private String nome;
    private String cognome;
    private LocalDate dataNascita;
    private String email;
    private Ruolo ruolo;
    private List<Prenotazione> prenotazioni;
    

    public UtenteDto(){
        
    }


    public UtenteDto(long id, String nome, String cognome, LocalDate dataNascita, String email, Ruolo ruolo, List<Prenotazione> prenotazioni) {
        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
        this.dataNascita = dataNascita;
        this.email = email;
        this.ruolo = ruolo;
        this.prenotazioni = prenotazioni;
    }
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
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

    public List<Prenotazione> getPrenotazioni() {
        return prenotazioni;
    }

    public void setPrenotazioni(List<Prenotazione> prenotazioni) {
        this.prenotazioni = prenotazioni;
    }


    


}
