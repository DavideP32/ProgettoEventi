/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.eventi.eventi.entities;

import java.beans.Transient;
import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;

import com.eventi.eventi.configuration.UploadImg;
import com.eventi.eventi.enums.Caratteristiche;
import com.eventi.eventi.enums.Tipologia;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="eventi")
public class Evento {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    
    @Column(columnDefinition = "ENUM('MUSICA', 'TEATRO_CINEMA', 'CIBO', 'FESTE_SAGRE', 'SPORT', 'ARTE')")
	@Enumerated(EnumType.STRING)
    private Tipologia tipologia;

    @Column(columnDefinition = "ENUM('PRENOTAZIONE_OBBLIGATORIA', 'ENTRATA_LIBERA')")
	@Enumerated(EnumType.STRING)
    private Caratteristiche caratteristiche;

    @Column(length=255)
    private String nome;

    @Column(length=255)
    private String descrizione;

    @Column(name="luogo_evento", length=255)
    private String luogoEvento;

    @Column(length=255)
    private String coordinateGPS;

    @Column(nullable=false)
    private int posti;
    
    @Column(nullable=false)
    private boolean disponibilita = true;

    @Column(name="data_evento", nullable=false)
    private LocalDate dataEvento;
    
    @Column(name="email")
    private String email;



    @Column(name="prezzo_listino")
    @ColumnDefault("null")
    private Double prezzo;


    @Column(name="percorso", length=255)
    private String percorso;

    @JsonIgnore
    @OneToMany(mappedBy="evento")
    private List<Prenotazione> prenotazioni;


    // metodo che gera l'url
    @Transient
    public String getUrl() {

		// 1) percorso immagine di default se non è stata caricata
		// 2) percorso immagine caricata

		if (percorso == null || percorso.equals("")) {
        	//1
        	return "/" + UploadImg.DEFAULT_IMG_PATH;        	
        }

        //2
        // return "/" + UploadImg.IMG_URL_PATH + "/" + id + "/" + percorso;
        return percorso;
    }
    

    public List<Prenotazione> getPrenotazioni() {
        return prenotazioni;
    }

    public void setPrenotazioni(List<Prenotazione> prenotazioni) {
        this.prenotazioni = prenotazioni;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Tipologia getTipologia() {
        return tipologia;
    }

    public void setTipologia(Tipologia tipologia) {
        this.tipologia = tipologia;
    }

    public Caratteristiche getCaratteristiche() {
        return caratteristiche;
    }

    public void setCaratteristiche(Caratteristiche caratteristiche) {
        this.caratteristiche = caratteristiche;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public String getLuogoEvento() {
        return luogoEvento;
    }

    public void setLuogoEvento(String luogoEvento) {
        this.luogoEvento = luogoEvento;
    }

    public String getCoordinateGPS() {
        return coordinateGPS;
    }

    public void setCoordinateGPS(String coordinateGPS) {
        this.coordinateGPS = coordinateGPS;
    }

    public int getPosti() {
        return posti;
    }

    public void setPosti(int posti) {
        this.posti = posti;
    }

    public boolean isDisponibilita() {
        return disponibilita;
    }

    public void setDisponibilita(boolean disponibilita) {
        this.disponibilita = disponibilita;
    }

    public LocalDate getDataEvento() {
        return dataEvento;
    }

    public void setDataEvento(LocalDate dataEvento) {
        this.dataEvento = dataEvento;
    }

    public Double getPrezzo() {
        return prezzo;
    }

    public void setPrezzo(Double prezzo) {
        this.prezzo = prezzo;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPercorso() {
        return percorso;
    }

    public void setPercorso(String percorso) {
        this.percorso = percorso;
    }



}
