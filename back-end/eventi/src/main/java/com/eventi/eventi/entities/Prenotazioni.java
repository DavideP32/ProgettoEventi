package com.eventi.eventi.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="prenotazioni")
public class Prenotazioni {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;


    @ManyToOne
    @JoinColumn(name = "utente_id")
    private long utenteId;

    @ManyToOne
    @JoinColumn(name="evento_id")
    private long eventoId;

    @Column
    private boolean pagato;

    @Column(name="numero_persone")
    private int numeroPersone;

    
    @Column
    private LocalDate createdAt;

   
 


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUtenteId() {
        return utenteId;
    }

    public void setUtenteId(long utenteId) {
        this.utenteId = utenteId;
    }

    public long getEventoId() {
        return eventoId;
    }

    public void setEventoId(long eventoId) {
        this.eventoId = eventoId;
    }


    public boolean isPagato() {
        return pagato;
    }

    public void setPagato(boolean pagato) {
        this.pagato = pagato;
    }

    public int getNumeroPersone() {
        return numeroPersone;
    }

    public void setNumeroPersone(int numeroPersone) {
        this.numeroPersone = numeroPersone;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    
}
