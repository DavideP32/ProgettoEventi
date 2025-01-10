/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.eventi.eventi.dtos;

import java.time.LocalDate;

import com.eventi.eventi.enums.Ruolo;

public class UtenteDto {

    private long id;
    private String nome;
    private String cognome;
    private LocalDate data_nascita;
    private String email;
    private Ruolo ruolo;
    

    public UtenteDto(){
        
    }


    public UtenteDto(long id, String nome, String cognome, LocalDate data_nascita, String email, Ruolo ruolo) {
        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
        this.data_nascita = data_nascita;
        this.email = email;
        this.ruolo = ruolo;
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
    public LocalDate getData_nascita() {
        return data_nascita;
    }
    public void setData_nascita(LocalDate data_nascita) {
        this.data_nascita = data_nascita;
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


    


}
